package com.unimib.singletonsquad.doit.database.volunteer;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerDatabaseService {

    private final IVolunteerRepository volunteerRepository;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final PasswordEncoder passwordEncoder;

    public Volunteer findVolunteerById(long id) {
        return volunteerRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundGeneralException("Volunteer not found with ID: " + id));
    }

    public Volunteer findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("Volunteer not found for email: " + email));
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public boolean authenticateVolunteer(String email, String rawPassword) {
        Volunteer volunteer = volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("Volunteer not found for email: " + email));
        return passwordEncoder.matches(rawPassword, volunteer.getPassword());
    }

    public void deleteVolunteer(String email) {
        Volunteer volunteer = volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("Volunteer not found for email: " + email));
        volunteerRepository.delete(volunteer);
    }


}
