package springbooteventapp.eventapp.manageEvents.mapper;

import org.mapstruct.Mapper;
import springbooteventapp.eventapp.manageEvents.dto.ParticipantDTO;
import springbooteventapp.eventapp.manageEvents.entity.Participant;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {


    ParticipantDTO mapToDto(Participant participant);
    Participant mapToEntity(ParticipantDTO participantDTO);
    List<ParticipantDTO> mapToDto(List<Participant> participantList);
    List<Participant> mapToEntity(List<ParticipantDTO> participantDTOList);

}
