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

    private final AuthFilter customBearerTokenFilter;
    private final SuccessAuthHandler successAuthHandler;
    private final FailureAuthHandler failureAuthHandler;

    public SecurityConfiguration(AuthFilter customBearerTokenFilter,
                                 SuccessAuthHandler successAuthHandler,
                                 FailureAuthHandler failureAuthHandler) {
        this.customBearerTokenFilter = customBearerTokenFilter;
        this.successAuthHandler = successAuthHandler;
        this.failureAuthHandler = failureAuthHandler;
    }

    @Bean
    public OAuth2AuthorizationRequestResolver customAuthorizationRequestResolver(
            ClientRegistrationRepository clientRegistrationRepository) {
        return new CustomAuthorizationRequestResolver(clientRegistrationRepository);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   ClientRegistrationRepository clientRegistrationRepository) throws Exception {

        return http
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                // Configurazione delle autorizzazioni
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/authentication/**", "/oauth/**").permitAll()
                        .anyRequest().authenticated()
                )
                // Configurazione OAuth2
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(authorization -> authorization
                                .authorizationRequestResolver(customAuthorizationRequestResolver(clientRegistrationRepository)))
                        .successHandler(successAuthHandler)
                        .failureHandler(failureAuthHandler)
                )
                // Gestione delle eccezioni per richieste non autorizzate
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()) // Aggiunto qui
                )
                // Gestione delle sessioni
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                // Posizionamento strategico del filtro JWT
                .addFilterBefore(customBearerTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .build();
    }

}
