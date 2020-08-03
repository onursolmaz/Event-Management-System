package springbooteventapp.eventapp.manageEvents.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springbooteventapp.eventapp.manageEvents.entity.Event;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    Optional<Event> findByName(String name);

    List<Event> findAll(Sort sort);

    @Transactional
    void deleteByName(String name);

}
