package cz.vse.menza_api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import cz.vse.menza_api.dto.OccupancyResponseDto;
import cz.vse.menza_api.dto.menu.DailyMenu;
import cz.vse.menza_api.dto.menu.DailyMenuResponse;
import cz.vse.menza_api.dto.menu.WeeklyMenu;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Service
public class OccupancyService {

    @Value("${menu.source}")
    private String menuSource;

    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;

    @Autowired
    public OccupancyService(ObjectMapper objectMapper, ResourceLoader resourceLoader) {
        this.objectMapper = objectMapper;
        this.resourceLoader = resourceLoader;
    }

    public OccupancyResponseDto getOccupancy(@RequestParam("canteen") String canteen) {
        try {
            Resource resource = resourceLoader.getResource(menuSource + canteen + "/occupancy.json");

            if (!resource.exists()){
                throw new ResourceNotFoundException("Daná menza neexistuje");
            }

            return objectMapper.readValue(resource.getInputStream(), OccupancyResponseDto.class);

        } catch (IOException e) {
            throw new RuntimeException("Error loading occupancy: " + e.getMessage(), e);
        }
    }

}
