package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.dto.received.CityInfoDTO;
import com.unimib.singletonsquad.doit.mappers.CityInfoMapper;
import com.unimib.singletonsquad.doit.repository.ICityInfoRepository;
import com.unimib.singletonsquad.doit.service.http.CityInfoHTTPService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class CityInfoDatabaseService {

    private final ICityInfoRepository cityInfoRepository;
    private final CityInfoHTTPService http;
    private final Map<String, CityInfo> cityInfoMap = new HashMap<>();

    ///
    public CityInfo getCityInfo(String cityName) throws UnsupportedEncodingException, InterruptedException {
        if (cityInfoMap.containsKey(cityName)) {
            return cityInfoMap.get(cityName);
        } else {
            Optional<CityInfo> cityInfo = this.cityInfoRepository.findByCityName(cityName);
            if(cityInfo.isPresent())
                return cityInfo.get();
            else
                return this.SaveRequestAndGetIT(cityName);
        }
    }

    /// Salva la città nel database
    private  CityInfo saveCityInfo(@NotNull final CityInfo cityInfo){
        CityInfo saved;
        if (!cityInfoMap.containsKey(cityInfo.getCityName())) {
            saved = this.cityInfoRepository.save(cityInfo);
            cityInfoMap.put(cityInfo.getCityName(), saved);
        } else {
            saved = cityInfoMap.get(cityInfo.getCityName());
        }
        return saved;
    }

    /// Serve per convertire i parametri della chiamata HTTP in una città
    private CityInfo createCityInfo(CityInfoDTO cityInfoDTO) {
        return CityInfoMapper.mapToCityInfo(cityInfoDTO);
    }

    private CityInfo saveDtoIntoDatabase(@NotNull final CityInfoDTO response){
        CityInfo temp = this.createCityInfo(response);
        return this.saveCityInfo(temp);
    }

    private CityInfo SaveRequestAndGetIT(@NotNull final String cityName) throws UnsupportedEncodingException,
            InterruptedException {
        Thread.sleep(600);
        double[] coords = this.http.getCoordinatesFromOpenCage(cityName);
        CityInfoDTO cityInfoDTO = new CityInfoDTO();
        cityInfoDTO.setCityName(cityName);
        cityInfoDTO.setLatitude(coords[0]);
        cityInfoDTO.setLongitude(coords[1]);
        return this.saveDtoIntoDatabase(cityInfoDTO);
    }

}
