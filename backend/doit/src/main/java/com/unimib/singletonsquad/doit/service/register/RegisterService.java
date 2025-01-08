package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

//template method
@Service
public abstract class RegisterService {

    protected abstract void checkUserForm(final SingInFormDTO form) throws Exception;
    protected abstract void authenticateUser(final SingInFormDTO form);
    protected abstract void sanitizeUserInputs(final SingInFormDTO form);

    public void saveUser(final SingInFormDTO form) throws Exception {
        try{
            System.out.println("Ok ok ok");
            sanitizeUserInputs(form);
            checkUserForm(form);
            authenticateUser(form);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    protected String sanitizeString(String input) {
        if (input == null) {
            return "";
        }

        // Prima fase: rimuove caratteri di controllo e altri caratteri non desiderati
        String cleaned = input.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "");

        // Seconda fase: codifica i caratteri speciali HTML
        cleaned = cleaned
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;")
                .replace("/", "&#x2F;");

        // Terza fase: rimuove eventuali script tag e altri tag pericolosi
        cleaned = cleaned.replaceAll("(?i)<script.*?>.*?</script.*?>", "")
                .replaceAll("(?i)<style.*?>.*?</style.*?>", "")
                .replaceAll("(?i)<.*?javascript:.*?>", "")
                .replaceAll("(?i)<.*?\\s+on.*?>", "");

        // Quarta fase: rimuove caratteri Unicode potenzialmente pericolosi
        cleaned = cleaned.replaceAll("[\\u2028\\u2029\\uFEFF\\uFFF0-\\uFFFF]", "");

        return cleaned.trim();
    }
}
