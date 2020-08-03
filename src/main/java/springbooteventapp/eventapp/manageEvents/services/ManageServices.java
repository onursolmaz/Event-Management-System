package springbooteventapp.eventapp.manageEvents.services;


import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import springbooteventapp.eventapp.manageEvents.entity.Event;
import springbooteventapp.eventapp.manageEvents.entity.Participant;
import springbooteventapp.eventapp.manageEvents.repository.EventRepository;
import springbooteventapp.eventapp.manageEvents.repository.ParticipantRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ManageServices {

    private final EventRepository eventRepository;
    private final ParticipantRepository participantRepository;

    public List<Event> listAllEvents(){

        return eventRepository.findAll(Sort.by("startDate").ascending());
    }

    @SneakyThrows
    public boolean addEvent(Event event) {
        Optional<Event> name = eventRepository.findByName(event.getName());
        if(name.isPresent()){
            System.out.println("Etkinlik zaten mevcut");
            return false;
        }else{
            eventRepository.save(event);
            return true;
        }

    }

    public List<Participant> listAllParticipant(){return participantRepository.findAll();}


    public Participant addParticipantToEvent(String name, Participant participant){
        Optional<Event> eventOptional=eventRepository.findByName(name);
        Event event=eventOptional.get();
        if(event.getQuota()>0) {
            event.setQuota(event.getQuota() - 1);
            Set<Participant> participants = event.getParticipants();
            participants.add(participant);
            Event savedEvent = eventRepository.save(event);
            return savedEvent.getParticipants().stream().filter(it -> it.getName().equals(participant.getName()))
                    .collect((toList())).get(0);
        }else{
            throw new EntityNotFoundException();
        }
    }

    public Set<Participant> getEventParticipants(String name){
        return eventRepository.findByName(name).map(Event::getParticipants)
                .orElseThrow(EntityNotFoundException::new);
    }

    public void deleteEvent(String name){
        eventRepository.deleteByName(name);
    }

    @Transactional
    public void uptadeEvent(String name, Event event){
        Optional<Event> eventOptional=eventRepository.findByName(name);
        if(eventOptional.isPresent()){
            uptadeEventFromDB(event,eventOptional.get());
   //         return eventRepository.save(event);

        }else{
            throw new EntityNotFoundException();
        }


    }

    public void uptadeEventFromDB(Event event, Event eventFromDB){
        eventFromDB.setName(event.getName());
        eventFromDB.setQuota(event.getQuota());
        eventFromDB.setStartDate(event.getStartDate());
        eventFromDB.setEndDate(event.getEndDate());

    }




}
