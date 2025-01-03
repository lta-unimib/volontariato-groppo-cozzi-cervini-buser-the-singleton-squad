package com.unimib.singletonsquad.doit.Security;

import com.unimib.singletonsquad.doit.Handler.FailureAuthHandler;
import com.unimib.singletonsquad.doit.Handler.SuccessAuthHandler;
import com.unimib.singletonsquad.doit.Resolver.CustomAuthorizationRequestResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    private final CustomBearerTokenFilter customBearerTokenFilter;
    private final SuccessAuthHandler successAuthHandler;
    private final FailureAuthHandler failureAuthHandler;

    // Costruttore per iniettare i componenti
    public SecurityConfiguration(CustomBearerTokenFilter customBearerTokenFilter,
                                 SuccessAuthHandler successAuthHandler,
                                 FailureAuthHandler failureAuthHandler) {
        this.customBearerTokenFilter = customBearerTokenFilter;
        this.successAuthHandler = successAuthHandler;
        this.failureAuthHandler = failureAuthHandler;
    }

    // Bean per il custom OAuth2AuthorizationRequestResolver
    @Bean
    public OAuth2AuthorizationRequestResolver customAuthorizationRequestResolver(
            ClientRegistrationRepository clientRegistrationRepository) {
        return new CustomAuthorizationRequestResolver(clientRegistrationRepository);
    }

    // Configurazione di sicurezza con Spring Security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   ClientRegistrationRepository clientRegistrationRepository) throws Exception {

        // Configurazione della sicurezza HTTP
        return http
                .cors(cors -> cors.disable())  // Disabilita il CORS, se necessario
                .csrf(csrf -> csrf.disable())  // Disabilita il CSRF (utile in API REST)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/authentication/**", "/oauth/**", "/login/**", "/public/**").permitAll()  // Permetti l'accesso a percorsi pubblici
                        .anyRequest().authenticated()  // Richiedi l'autenticazione per le altre rotte
                )
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(authorization -> authorization
                                .authorizationRequestResolver(customAuthorizationRequestResolver(clientRegistrationRepository)))  // Usa il resolver personalizzato
                        .successHandler(successAuthHandler)  // Handler personalizzato per il successo
                        .failureHandler(failureAuthHandler)  // Handler personalizzato per il fallimento
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Gestione stateless per le API REST
                )
                .addFilterBefore(customBearerTokenFilter, UsernamePasswordAuthenticationFilter.class)  // Aggiungi il filtro JWT
                .formLogin(form -> form.disable())  // Disabilita il login tramite form
                .httpBasic(httpBasic -> httpBasic.disable())  // Disabilita il login basato su HTTP Basic
                .build();  // Costruisci la configurazione
    }
}
