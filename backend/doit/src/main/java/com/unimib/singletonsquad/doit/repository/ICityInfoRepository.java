package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface ICityInfoRepository extends JpaRepository<CityInfo, Long> {
    Optional<CityInfo> findByCityName(String cityName);
    boolean existsByCityName(String cityName);
}
