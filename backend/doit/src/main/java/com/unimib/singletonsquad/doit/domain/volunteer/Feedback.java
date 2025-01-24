package com.unimib.singletonsquad.doit.domain.volunteer;
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
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "vote")
    private double vote;
}

/*
    LA COSA PIù SEMPLICE DA FARE è CHE QUANDO APRI UNA PAGINA DEDICATA CHE CONTIENE,
    GLI EVENTI A CUI TI SEI ISCRITTO, SI FA UNA CHIAMATA AD UN ENDPOINT CHE PRENDE
    TUTTI GLI EVENTI CHE SONO CONCLUSI AL QUALE L'UTENTE SI è ISCRITTO E CHE HANNO VOTO
    NULL.

 */
