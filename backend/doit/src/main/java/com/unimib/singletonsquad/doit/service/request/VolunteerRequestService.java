package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VolunteerRequestService {
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerRequestMapper volunteerRequestMapper;
    private final VolunteerRequestMatchingService volunteerRequestMatchingService;
    private final VolunteerDatabaseService volunteerDatabaseService;


    /// DELETE VOLUNTEER REQUEST
    public void deleteVolunteerRequest(final Long requestId, final String email) throws Exception {
        checkOrganizationRequestDelete(requestId, email);
        this.volunteerRequestDatabaseService.deleteRequestById(requestId);
    }
    private void checkOrganizationRequestDelete(final Long requestId, final String email) throws Exception {
        VolunteerRequest request= this.getSpecificRequest(requestId);
        String emailOrganization = request.getOrganization().getEmail();
        if(!emailOrganization.equals(email))
            throw new IllegalAccessException("Organization email does not match");
    }

    /// UPDATE VOLUNTEER REQUEST
    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id, final String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.updateVolunteerRequest(volunteerRequestDTO, id, email);
            this.volunteerRequestDatabaseService.updateRequest(temp, id);
    }

    /// CREATE VOLUNTEER REQUEST
    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO, email);
            this.volunteerRequestDatabaseService.save(temp);
    }

    /// SUPPORT METHOD
    public VolunteerRequest getSpecificRequest(Long idRequest) throws Exception {
        return this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
    }


    /// GET ALL ORGANIZATION VOLUNTEER REQUEST
    public List<VolunteerRequestSendDTO> getAllRequestByOrganizationName(String name) {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByName(name);
        return getRequestSendDTOList(tempLista);
    }

    /// GET ALL ORGANIZATION BY EMAIL
    public List<VolunteerRequestSendDTO> getAllRequestByOrganizationEmail(String email) {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(email);
        return getRequestSendDTOList(tempLista);
    }


    /// FIXME INSERIRLO IN UN MAPPER DTO APPOSITO
    private List<VolunteerRequestSendDTO> getRequestSendDTOList(final List<VolunteerRequest> volunteerRequest) {
        List<VolunteerRequestSendDTO> volunteerRequestDTOS = new ArrayList<>();
        for (VolunteerRequest volunteersingle : volunteerRequest) {
            volunteerRequestDTOS.add(volunteerRequestMapper.;
        }
        return volunteerRequestDTOS;
    }


    /// Necessario per aggiungere una nuova OFFRTA ALLA RICHIESTA
    public void addVolunteerOffer(Long idRequest, VolunteerOffer volunteerOffer) throws Exception{
        VolunteerRequest request = getSpecificRequest(idRequest);
        request.getVolunteerOffers().add(volunteerOffer);
        this.volunteerRequestDatabaseService.save(request);

    }
}
