package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestControllerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
public class VolunteerRequestController {

    @Autowired
    private VolunteerRequestControllerService volunteerRequestControllerService;

    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(final @RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        try{
            this.volunteerRequestControllerService.createVolunteerRequest(volunteerRequestDTO);
            return ResponseEntity.ok().body("VolunteerRequest created successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteVolunteerRequest(final @PathVariable Long idRequest) {
        try{
            this.volunteerRequestControllerService.deleteVolunteerRequest(idRequest);
            return ResponseEntity.ok("VolunteerRequest deleted successfully");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateVolunteerRequest(final @PathVariable Long idRequest,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        try {
            this.volunteerRequestControllerService.updateVolunteerRequest(volunteerRequestDTO, idRequest);
            return ResponseEntity.ok("VolunteerRequest updated successfully");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //TODO
    /*
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
    /*

        return null;
    }*/

}
