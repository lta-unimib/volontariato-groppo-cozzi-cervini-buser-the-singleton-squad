package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.IVolunteerOfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class VolunteerOfferDatabaseService {
    private final IVolunteerOfferRepository volunteerOfferRepository;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    public void saveVolunteerOffer(VolunteerOffer v){
        this.volunteerOfferRepository.save(v);
    }

    /// GET ALL THE OFFER OF A VOLUNTEER
    public List<VolunteerOffer> getAllOffersOfTheVolunteer(final String email) {
        return this.volunteerOfferRepository.getAllOfferVolunteer(email);
    }

    public VolunteerOffer getVolunteerOffer(final Long id) throws RecordNotFoundGeneralException  {
        return this.volunteerOfferRepository.findById(id).orElseThrow(() ->{
            throw new RecordNotFoundGeneralException("Record not found");
        });
    }


    public void deleteVolunteerOffer(VolunteerOffer offer){
        volunteerOfferRepository.delete(offer);
    }

    public void deleteVolunteerOffer(Long idOffer, String email){
        VolunteerOffer temp = volunteerOfferRepository.findVolunteerOfferForDeleting(email, idOffer, LocalDateTime.now()).orElseThrow(
                () -> new RecordNotFoundGeneralException("Record not found")
        );
        VolunteerRequest volunteerRequest = temp.getVolunteerRequest();
        volunteerRequest.setTotalParticipants(volunteerRequest.getTotalParticipants()-1);
        volunteerRequestDatabaseService.save(volunteerRequest);
        volunteerOfferRepository.delete(temp);
    }


    public void getVolunteerOfferCheckSubscribe(Long idVolunteer, Long idOffer) throws RecordNotFoundGeneralException {
         if(this.volunteerOfferRepository.checkValidation(idVolunteer, idOffer).isPresent())
             throw new RecordNotFoundGeneralException("Already syb");

    }

    public VolunteerOffer getVolunteerOfferByIdVolunteerAndIdRequest(Long idVolunteer, Long idRequest){
        return this.volunteerOfferRepository.getVolunteerOfferByIdVolunteerAndIdRequest(idVolunteer, idRequest).orElseThrow( () ->{
            throw new RecordNotFoundGeneralException("Record not found with id " + idVolunteer);
        });
    }

    /// getAllVoteByEventsByRequestId
    public double getAllVoteByEventsByOfferId(Long id){
        return volunteerOfferRepository.getAllVoteByEventsByOfferId(id);
    }

    public VolunteerOffer getVolunteerOfferByRequestId(Long idRequest, String idVolotario){
        return this.volunteerOfferRepository.getVolunteerOfferByRequestId(idRequest, idVolotario, LocalDateTime.now()).orElseThrow( () ->{
            throw new RecordNotFoundGeneralException("Record not found with id request " + idRequest);
        });
    }
    public VolunteerOffer getVolunteerOfferByRequestId1(Long idRequest, String idVolotario, Organization organization){
        return this.volunteerOfferRepository.getVolunteerOfferByRequestId1(idRequest, idVolotario, LocalDateTime.now(), organization).orElseThrow( () ->{
            throw new RecordNotFoundGeneralException("Record not found with id request " + idRequest);
        });
    }

}
