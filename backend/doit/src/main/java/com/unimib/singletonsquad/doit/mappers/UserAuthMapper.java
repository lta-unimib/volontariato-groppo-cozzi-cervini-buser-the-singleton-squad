package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.dto.UserAuthDTO;

public class UserAuthMapper {

    public UserAuthDTO createUserAuth(String role, String token, Long userId, boolean isRegistered) {
        return new UserAuthDTO.Builder().authToken(token).role(role).isRegistered(isRegistered).userId(userId).build();
    }
}
