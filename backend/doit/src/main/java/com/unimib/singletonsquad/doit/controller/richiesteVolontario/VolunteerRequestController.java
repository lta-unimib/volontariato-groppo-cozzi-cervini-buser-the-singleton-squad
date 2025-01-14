
package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
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


    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(@RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        System.out.println("POST volunteer request: \n" + volunteerRequestDTO);
        //this.volunteerRequestService.save(volunteerRequestDTO);
        return ResponseEntity.ok().body("VolunteerRequest created successfully");
    }

    @DeleteMapping("/{idRequest}/")
    public ResponseEntity<?> deleteVolunteerRequest(final @PathVariable Long idRequest) {
        try{
            this.volunteerRequestControllerService.deleteVolunteerRequest(idRequest);
            return ResponseEntity.ok("VolunteerRequest deleted successfully");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{idRequest}/")
    public ResponseEntity<?> updateVolunteerRequest(final @PathVariable Long idRequest,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        try {
            this.volunteerRequestControllerService.updateRequestService(volunteerRequestDTO, idRequest);
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
    }
/*

    @DeleteMapping("/delete/{id_richiesta}")
    public ResponseEntity<String> deleteVolunteerRequest(@PathVariable Long id_richiesta) {

        return null;
    }

    @PutMapping("/update/{id_richiesta}")
    public ResponseEntity<String> updateVolunteerRequest(@PathVariable Long id_richiesta,
                                                         @RequestBody VolunteerRequestDTO requestDTO) {
        return null;
    }
    */
}
