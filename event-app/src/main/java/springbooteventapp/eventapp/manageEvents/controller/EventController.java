package springbooteventapp.eventapp.manageEvents.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springbooteventapp.eventapp.manageEvents.dto.EventDTO;
import springbooteventapp.eventapp.manageEvents.entity.Event;
import springbooteventapp.eventapp.manageEvents.mapper.EventMapper;
import springbooteventapp.eventapp.manageEvents.services.ManageServices;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {
    private final ManageServices manageServices;
    private final EventMapper eventMapper;


    @GetMapping("/events")
    public List<EventDTO> listAllEvents(){
        List<Event> events=manageServices.listAllEvents();
        return eventMapper.mapToDto(events);
    }

    @PostMapping("/events")
    public ResponseEntity addEvent(@RequestBody EventDTO eventDTO){
        Event event=eventMapper.mapToEntity(eventDTO);
        if(manageServices.addEvent(event)){
            return new ResponseEntity(HttpStatus.OK);

        }
        else{
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{name}")
    public void deleteEvent(@PathVariable String name){
        manageServices.deleteEvent(name);
    }

    @PutMapping("/{name}")
    public void uptadeEvent(@PathVariable String name, @RequestBody EventDTO eventDTO){
     Event event=eventMapper.mapToEntity(eventDTO);
       manageServices.uptadeEvent(name,event);


    }

}
