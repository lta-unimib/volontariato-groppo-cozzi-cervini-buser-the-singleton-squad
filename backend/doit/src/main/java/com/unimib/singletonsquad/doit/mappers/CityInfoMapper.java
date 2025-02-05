package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.dto.received.CityInfoDTO;
import org.springframework.stereotype.Component;

@Component
public class CityInfoMapper {

    private CityInfoMapper() {}

    public static CityInfo mapToCityInfo(CityInfoDTO cityInfoDTO){
        CityInfo cityInfo = new CityInfo();
        cityInfo.setCityName(cityInfoDTO.getCityName());
        cityInfo.setLatitude(cityInfoDTO.getLatitude());
        cityInfo.setLongitude(cityInfoDTO.getLongitude());
        return cityInfo;
    }
}

