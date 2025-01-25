package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
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

    public void deleteVolunteerOffer(Long requestId, String email){
        VolunteerOffer temp = volunteerOfferRepository.findVolunteerOfferForDeleting(email, requestId, LocalDateTime.now()).orElseThrow(
                () -> new RecordNotFoundGeneralException("Record not found")
        );
        volunteerOfferRepository.delete(temp);
    }

    public VolunteerOffer existsVolunteerOfferByOrganization(final Long idOffer, final Organization organization) {
        return this.volunteerOfferRepository.findByIdAndOrganizationCustom(organization, idOffer, LocalDateTime.now()).orElseThrow(
                () -> new RecordNotFoundGeneralException("Record not found with id " + idOffer + " and organization " + organization + " enddate: " +LocalDateTime.now()));
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

}
