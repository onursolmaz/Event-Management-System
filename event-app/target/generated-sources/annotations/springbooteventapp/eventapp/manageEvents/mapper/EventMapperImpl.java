package springbooteventapp.eventapp.manageEvents.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import springbooteventapp.eventapp.manageEvents.dto.EventDTO;
import springbooteventapp.eventapp.manageEvents.entity.Event;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-08-02T21:30:08+0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 14.0.2 (Oracle Corporation)"
)
@Component
public class EventMapperImpl implements EventMapper {

    @Override
    public EventDTO mapToDto(Event event) {
        if ( event == null ) {
            return null;
        }

        EventDTO eventDTO = new EventDTO();

        eventDTO.setName( event.getName() );
        eventDTO.setQuota( event.getQuota() );
        eventDTO.setStartDate( event.getStartDate() );
        eventDTO.setEndDate( event.getEndDate() );

        return eventDTO;
    }

    @Override
    public Event mapToEntity(EventDTO eventDTO) {
        if ( eventDTO == null ) {
            return null;
        }

        Event event = new Event();

        event.setName( eventDTO.getName() );
        event.setQuota( eventDTO.getQuota() );
        event.setStartDate( eventDTO.getStartDate() );
        event.setEndDate( eventDTO.getEndDate() );

        return event;
    }

    @Override
    public List<EventDTO> mapToDto(List<Event> eventList) {
        if ( eventList == null ) {
            return null;
        }

        List<EventDTO> list = new ArrayList<EventDTO>( eventList.size() );
        for ( Event event : eventList ) {
            list.add( mapToDto( event ) );
        }

        return list;
    }

    @Override
    public List<Event> mapToEntity(List<EventDTO> eventDTOList) {
        if ( eventDTOList == null ) {
            return null;
        }

        List<Event> list = new ArrayList<Event>( eventDTOList.size() );
        for ( EventDTO eventDTO : eventDTOList ) {
            list.add( mapToEntity( eventDTO ) );
        }

        return list;
    }
}
