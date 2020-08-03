package springbooteventapp.eventapp.manageEvents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springbooteventapp.eventapp.manageEvents.entity.Participant;

public interface ParticipantRepository extends JpaRepository<Participant,Long> {


}
