package springbooteventapp.eventapp.manageEvents.mapper;


import org.mapstruct.Mapper;
import springbooteventapp.eventapp.manageEvents.dto.EventDTO;
import springbooteventapp.eventapp.manageEvents.entity.Event;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {

    EventDTO mapToDto(Event event);
    Event mapToEntity(EventDTO eventDTO);
    List<EventDTO> mapToDto(List<Event> eventList);
    List<Event> mapToEntity(List<EventDTO> eventDTOList);


}
