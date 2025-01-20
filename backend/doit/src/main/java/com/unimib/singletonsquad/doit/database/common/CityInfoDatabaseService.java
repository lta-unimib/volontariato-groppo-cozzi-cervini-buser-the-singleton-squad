package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.dto.CityInfoDTO;
import com.unimib.singletonsquad.doit.mappers.CityInfoMapper;
import com.unimib.singletonsquad.doit.repository.ICityInfoRepository;
import com.unimib.singletonsquad.doit.service.http.CityInfoHTTPService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;;

@Service
@AllArgsConstructor
@Transactional
public class CityInfoDatabaseService {

    private final ICityInfoRepository cityInfoRepository;
    private final CityInfoMapper cityInfoMapper;
    private final CityInfoHTTPService http;

    /// proxy
    public CityInfo getCityInfo(String cityName) throws Exception {
        Optional<CityInfo> cityInfo = this.cityInfoRepository.findByCityName(cityName);
        /// todo hashmap
        if(cityInfo.isPresent())
            return cityInfo.get();
        else
            return this.getCityAndSave(cityName);
    }

    /// Salva la città nel database
    public CityInfo saveCityInfo(@NotNull final CityInfo cityInfo) throws Exception {
        return this.cityInfoRepository.save(cityInfo);
    }
    /// Serve per convertire i parametri della chiamata HTTP in una città
    private CityInfo createCityInfo(CityInfoDTO cityInfoDTO) {
        return this.cityInfoMapper.mapToCityInfo(cityInfoDTO);
    }
    private CityInfo saveDtoIntoDatabase(@NotNull final CityInfoDTO response) throws Exception {
        CityInfo temp = this.createCityInfo(response);
        return this.saveCityInfo(temp);
    }
    private CityInfo getCityAndSave(@NotNull final String cityName) throws Exception {
        ///due to API can just get 1 request per second
        //Thread.sleep(1000);
        double[] coords = this.http.getCoordinatesFromOpenCage(cityName);
        CityInfoDTO cityInfoDTO = new CityInfoDTO();
        cityInfoDTO.setCityName(cityName);
        cityInfoDTO.setLatitude(coords[0]);
        cityInfoDTO.setLongitude(coords[1]);
        return this.saveDtoIntoDatabase(cityInfoDTO);
    }

}
