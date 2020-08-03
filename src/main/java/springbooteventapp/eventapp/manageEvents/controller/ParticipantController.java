package springbooteventapp.eventapp.manageEvents.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springbooteventapp.eventapp.manageEvents.dto.ParticipantDTO;
import springbooteventapp.eventapp.manageEvents.entity.Participant;
import springbooteventapp.eventapp.manageEvents.mapper.ParticipantMapper;
import springbooteventapp.eventapp.manageEvents.services.ManageServices;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ParticipantController {

    private final ManageServices manageServices;
    private final ParticipantMapper participantMapper;


    @GetMapping("{name}/participants")
    public List<ParticipantDTO> getEventParticipants(@PathVariable String name){
        Set<Participant> eventParticipants=manageServices.getEventParticipants(name);
        return participantMapper.mapToDto(new ArrayList<>(eventParticipants));
    }
    @PostMapping("/{name}/participants")
    public ParticipantDTO addParticipantsToEvent(@PathVariable String name, @RequestBody ParticipantDTO participantDTO){
        Participant addedParticipant=manageServices.addParticipantToEvent(name,participantMapper.mapToEntity(participantDTO));

        return participantMapper.mapToDto(addedParticipant);


    }


}
