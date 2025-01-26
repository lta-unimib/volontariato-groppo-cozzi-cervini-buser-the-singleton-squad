package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerRequestService {
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerRequestMapper volunteerRequestMapper;


    /// DELETE VOLUNTEER REQUEST
    public void deleteVolunteerRequest(final Long requestId, final Organization organization) throws Exception {
        VolunteerRequest request = this.getSpecificRequest(requestId);
        checkOrganizationRequest(request, organization);
        this.volunteerRequestDatabaseService.deleteRequestById(requestId);
    }

    /// UPDATE VOLUNTEER REQUEST
    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id, final Organization organization)
            throws Exception {
            VolunteerRequest request = this.getSpecificRequest(id);
            checkOrganizationRequest(request, organization);
            VolunteerRequest temp = this.volunteerRequestMapper.updateVolunteerRequest(request, volunteerRequestDTO);
            this.volunteerRequestDatabaseService.updateRequest(temp, id);
    }

    /// CREATE VOLUNTEER REQUEST
    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, Organization organization)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createVolunteerRequest(volunteerRequestDTO, organization);
            this.volunteerRequestDatabaseService.save(temp);
    }

    /// ==== SUPPORT METHOD ====
    public VolunteerRequest getSpecificRequest(Long idRequest) throws Exception {
        return this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
    }

    /// check id request is equal to organization email
    private void checkOrganizationRequest(final VolunteerRequest volunteerRequest, Organization organization) throws Exception
    {
        if (!organization.getEmail().equals(volunteerRequest.getOrganization().getEmail()))
            throw new IllegalAccessException("Organization email does not match");
    }

    /// GET ALL ORGANIZATION VOLUNTEER REQUEST
    public List<VolunteerRequestSendDTO> getAllRequestByOrganizationName(String name) throws UnsupportedEncodingException, InterruptedException {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByName(name);
        return this.volunteerRequestMapper.getRequestSendDTOList(tempLista);
    }

    /// GET ALL ORGANIZATION VOLUNTEER REQUEST
    public List<VolunteerRequestSendDTO> getAllExpiredRequestByOrganizationName(String name) throws UnsupportedEncodingException, InterruptedException {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByName(name);
        List<VolunteerRequest> tempListaSend = new ArrayList<>();
        for (VolunteerRequest volunteerRequest : tempLista) {
            if (volunteerRequest.getEndDateTime().isBefore(LocalDateTime.now())) {
                tempListaSend.add(volunteerRequest);
            }
        }
        return this.volunteerRequestMapper.getRequestSendDTOList(tempListaSend);
    }

    /// GET ALL ORGANIZATION BY EMAIL
    public List<VolunteerRequestSendDTO> getAllRequestByOrganizationEmail(String email) throws UnsupportedEncodingException, InterruptedException {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(email);
        return this.volunteerRequestMapper.getRequestSendDTOList(tempLista);
    }

    /// GET ALL ORGANIZATION BY EMAIL
    public List<VolunteerRequestSendDTO> getAllExpiredRequestByOrganizationEmail(String email) throws UnsupportedEncodingException, InterruptedException {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(email);
        List<VolunteerRequest> tempListaSend = new ArrayList<>();
        for (VolunteerRequest volunteerRequest : tempLista) {
            if (volunteerRequest.getEndDateTime().isBefore(LocalDateTime.now())) {
                tempListaSend.add(volunteerRequest);
            }
        }
        return this.volunteerRequestMapper.getRequestSendDTOList(tempListaSend);
    }

    /// GET ALL ORGANIZATION BY EMAIL
    public List<VolunteerRequestSendDTO> getAllActiveRequestByOrganizationEmail(String email) throws UnsupportedEncodingException, InterruptedException {
        List<VolunteerRequest> tempLista = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(email);
        List<VolunteerRequest> tempListaSend = new ArrayList<>();
        for (VolunteerRequest volunteerRequest : tempLista) {
            if (volunteerRequest.getEndDateTime().isAfter(LocalDateTime.now())) {
                tempListaSend.add(volunteerRequest);
            }
        }
        return this.volunteerRequestMapper.getRequestSendDTOList(tempListaSend);
    }

    /// Necessario per aggiungere una nuova OFFRTA ALLA RICHIESTA
    public void addVolunteerOffer(Long idRequest, VolunteerOffer volunteerOffer) throws Exception{
        VolunteerRequest request = getSpecificRequest(idRequest);
        request.getVolunteerOffers().add(volunteerOffer);
        this.volunteerRequestDatabaseService.save(request);

    }
}
