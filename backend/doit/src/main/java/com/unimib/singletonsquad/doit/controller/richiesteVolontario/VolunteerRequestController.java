package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import com.unimib.singletonsquad.doit.service.request.RequestHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/richieste")
public class VolunteerRequestController {
    @Autowired
    private VolunteerRequestService volunteerRequestService;

    @Autowired
    @Qualifier("")
    private RequestHandlerService requestHandlerService;

    @PostMapping("/nuova")
    public ResponseEntity<String> createVolunteerRequest(@RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        System.out.println("POST volunteer request: \n" + volunteerRequestDTO);
        this.volunteerRequestService.save(volunteerRequestDTO);
        return ResponseEntity.ok().body("VolunteerRequest created successfully");
    }


    @GetMapping("/ottieni")
    public ResponseEntity<List<VolunteerRequestDTO>> getVolunteerRequestsParam(@RequestParam String city,
                                                                          @RequestParam String startDate,
                                                                          @RequestParam String endDate,
                                                                          @RequestParam String categories)
    {



        return null;
    }

    @GetMapping("/ottieni")
    public ResponseEntity<List<VolunteerRequestDTO>> getVolunteerRequestsAlgorithm(){
        /** todo
            distanza 30%
            categorie_preferite 40%
            disponibilità_temporale 30%

            classe che contiene tutte le richieste di volontariato, tipo catalogo
            CONTROLLER --> SERVICE --> REPOSITORY --> SERVICE, elabora e le riordina, --> CONTROLLER --> RISPOSTA
        */


        return null;
    }


    @DeleteMapping("/delete/{id_richiesta}")
    public ResponseEntity<String> deleteVolunteerRequest(@PathVariable Long id_richiesta) {

        return null;
    }

    @PutMapping("/update/{id_richiesta}")
    public ResponseEntity<String> updateVolunteerRequest(@PathVariable Long id_richiesta,
                                                         @RequestBody VolunteerRequestDTO requestDTO) {
        return null;
    }





}
