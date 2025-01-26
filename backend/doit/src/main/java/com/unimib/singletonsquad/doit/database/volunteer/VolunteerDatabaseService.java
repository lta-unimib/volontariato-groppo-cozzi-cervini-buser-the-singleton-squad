package com.unimib.singletonsquad.doit.database.volunteer;
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
    private final PasswordEncoder passwordEncoder;
    private static final String ERROR_MESSSAGE_EMAIL = "Volunteer not found for email: ";

    public Volunteer findVolunteerById(long id) {
        return volunteerRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundGeneralException("Volunteer not found with ID: " + id));
    }

    public Volunteer findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException(ERROR_MESSSAGE_EMAIL + email));
    }

    public boolean existsVolunteerByEmail(String email) {
        if(!volunteerRepository.existsByEmail(email))
            throw new RecordNotFoundGeneralException(ERROR_MESSSAGE_EMAIL + email);
        return true;
    }


    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public boolean authenticateVolunteer(String email, String rawPassword) {
        Volunteer volunteer = volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException(ERROR_MESSSAGE_EMAIL + email));
        return passwordEncoder.matches(rawPassword, volunteer.getPassword());
    }

    public void deleteVolunteer(String email) {
        Volunteer volunteer = volunteerRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException(ERROR_MESSSAGE_EMAIL + email));
        volunteerRepository.delete(volunteer);
    }


}
