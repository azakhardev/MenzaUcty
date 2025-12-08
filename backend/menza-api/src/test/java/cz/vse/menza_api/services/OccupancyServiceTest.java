package cz.vse.menza_api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import cz.vse.menza_api.dto.OccupancyResponseDto;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OccupancyServiceTest {

    @Mock
    private ResourceLoader resourceLoader;

    @Mock
    private ObjectMapper objectMapper;

    @Mock
    private Resource mockResource;

    @InjectMocks
    private OccupancyService occupancyService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(occupancyService, "menuSource", "data/menus/");
    }

    @Test
    void getOccupancy_ShouldThrowException_WhenResourceDoesNotExist() {
        // 1. Arrange
        String canteen = "neexistujiciMenza";

        // Když se service zeptá na resource, vrátíme náš mock
        when(resourceLoader.getResource(anyString())).thenReturn(mockResource);
        when(mockResource.exists()).thenReturn(false);

        // 2. Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            occupancyService.getOccupancy(canteen);
        });
    }

    @Test
    void getOccupancy_ShouldReturnDto_WhenResourceExists() throws Exception {
        // 1. Arrange
        String canteen = "zizkov";
        OccupancyResponseDto expectedDto = new OccupancyResponseDto();

        when(resourceLoader.getResource(anyString())).thenReturn(mockResource);
        when(mockResource.exists()).thenReturn(true);

        // Simulujeme obsah souboru (prázdný JSON objekt {})
        when(mockResource.getInputStream()).thenReturn(new ByteArrayInputStream("{}".getBytes(StandardCharsets.UTF_8)));

        // Simulujeme, že ObjectMapper z toho JSONu vytvoří náš objekt
        when(objectMapper.readValue(any(ByteArrayInputStream.class), any(Class.class))).thenReturn(expectedDto);

        // 2. Act
        OccupancyResponseDto result = occupancyService.getOccupancy(canteen);

        // 3. Assert
        assertNotNull(result);
        assertEquals(expectedDto, result);
    }
}