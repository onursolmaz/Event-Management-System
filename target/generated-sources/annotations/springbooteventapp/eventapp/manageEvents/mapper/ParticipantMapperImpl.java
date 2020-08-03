package springbooteventapp.eventapp.manageEvents.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import springbooteventapp.eventapp.manageEvents.dto.ParticipantDTO;
import springbooteventapp.eventapp.manageEvents.entity.Participant;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-08-02T21:30:08+0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 14.0.2 (Oracle Corporation)"
)
@Component
public class ParticipantMapperImpl implements ParticipantMapper {

    @Override
    public ParticipantDTO mapToDto(Participant participant) {
        if ( participant == null ) {
            return null;
        }

        ParticipantDTO participantDTO = new ParticipantDTO();

        participantDTO.setName( participant.getName() );
        participantDTO.setSurname( participant.getSurname() );
        participantDTO.setEmail( participant.getEmail() );
        participantDTO.setTcKimlikNo( participant.getTcKimlikNo() );

        return participantDTO;
    }

    @Override
    public Participant mapToEntity(ParticipantDTO participantDTO) {
        if ( participantDTO == null ) {
            return null;
        }

        Participant participant = new Participant();

        participant.setName( participantDTO.getName() );
        participant.setSurname( participantDTO.getSurname() );
        participant.setEmail( participantDTO.getEmail() );
        participant.setTcKimlikNo( participantDTO.getTcKimlikNo() );

        return participant;
    }

    @Override
    public List<ParticipantDTO> mapToDto(List<Participant> participantList) {
        if ( participantList == null ) {
            return null;
        }

        List<ParticipantDTO> list = new ArrayList<ParticipantDTO>( participantList.size() );
        for ( Participant participant : participantList ) {
            list.add( mapToDto( participant ) );
        }

        return list;
    }

    @Override
    public List<Participant> mapToEntity(List<ParticipantDTO> participantDTOList) {
        if ( participantDTOList == null ) {
            return null;
        }

        List<Participant> list = new ArrayList<Participant>( participantDTOList.size() );
        for ( ParticipantDTO participantDTO : participantDTOList ) {
            list.add( mapToEntity( participantDTO ) );
        }

        return list;
    }
}
