package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackVolunteerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "voto")
    private double voto;

    /// Aggiungerlo anche nello user
    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;


    /// aggiungerlo anche nella VolunteerRequest
    @ManyToOne
    @JoinColumn(nullable = false, name = "volunteer_request_id")
    private VolunteerRequest volunteerRequest;


}

/*
    LA COSA PIù SEMPLICE DA FARE è CHE QUANDO APRI UNA PAGINA DEDICATA CHE CONTIENE,
    GLI EVENTI A CUI TI SEI ISCRITTO, SI FA UNA CHIAMATA AD UN ENDPOINT CHE PRENDE
    TUTTI GLI EVENTI CHE SONO CONCLUSI AL QUALE L'UTENTE SI è ISCRITTO E CHE HANNO VOTO
    NULL.

 */
