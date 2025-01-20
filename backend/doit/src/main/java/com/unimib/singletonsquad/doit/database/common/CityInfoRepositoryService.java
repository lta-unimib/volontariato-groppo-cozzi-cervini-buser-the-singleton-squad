package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.dto.CityInfoDTO;
import com.unimib.singletonsquad.doit.mappers.CityInfoMapper;
import com.unimib.singletonsquad.doit.repository.concrete_repository.ICityInfoRepository;
import com.unimib.singletonsquad.doit.utils.common.HttpClientServiceUtil;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CyclicBarrier;

@Service
@AllArgsConstructor
@Transactional
public class CityInfoRepositoryService {

    private final ICityInfoRepository cityInfoRepository;
    private final CityInfoMapper cityInfoMapper;
    private final HttpClientServiceUtil httpClient;
    private final static String CITY_INFO_URL = "/cityinfo";


    /// Da implementare con il pattern Proxy:
    ///     - se non esiste nel database viene fatta la chiamata verso il servizio e poi
    ///       viene salvata nel database
    public CityInfo getCityInfo(String cityName) throws Exception {
        CityInfo cityInfo = null;
        if(this.cityInfoRepository.existsByCityName(cityName)){
            cityInfo = this.getCityInfo(cityName);
        }
        else {
            CityInfoDTO response = this.getCityInfoAPI(cityName) ;
            cityInfo = this.saveDtoIntoDatabase(response);
        }
        return cityInfo;
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

    private CityInfoDTO getCityInfoAPI(@NotNull String cityName) throws Exception {
        return httpClient.executeGet(
                CITY_INFO_URL,
                CityInfoDTO.class
        );
    }

}
