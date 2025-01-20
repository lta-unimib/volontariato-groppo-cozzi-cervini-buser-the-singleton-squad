package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.dto.CityInfoDTO;
import com.unimib.singletonsquad.doit.mappers.CityInfoMapper;
import com.unimib.singletonsquad.doit.repository.concrete_repository.ICityInfoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CityInfoRepositoryService {

    private final ICityInfoRepository cityInfoRepository;
    private final CityInfoMapper cityInfoMapper;


    /// Da implementare con il pattern Proxy:
    ///     - se non esiste nel database viene fatta la chiamata verso il servizio e poi
    ///       viene salvata nel database
    public CityInfo getCityInfo(String cityName) {
        CityInfo cityInfo = null;
        if(this.cityInfoRepository.existsByCityName(cityName)){
            cityInfo = this.getCityInfo(cityName);
        }
        else {
            /// chiamata API per poi salvarla
        }
        return cityInfo;
    }



    /// Salva la città nel database
    public void saveCityInfo(CityInfo cityInfo) {
        this.cityInfoRepository.save(cityInfo);
    }


    /// Serve per convertire i parametri della chiamata HTTP in una città
    private CityInfo createCityInfo(CityInfoDTO cityInfoDTO) {
        return this.cityInfoMapper.mapToCityInfo(cityInfoDTO);
    }



}
