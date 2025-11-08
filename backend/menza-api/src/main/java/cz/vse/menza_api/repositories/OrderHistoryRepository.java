package cz.vse.menza_api.repositories;

import cz.vse.menza_api.models.OrdersHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrdersHistory, Long> {
    List<OrdersHistory> findByUserId(Long userId);
}