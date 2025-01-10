package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;

public interface IVolunteerOfferRepository {
    VolunteerOffer save(VolunteerOffer offer);
}
