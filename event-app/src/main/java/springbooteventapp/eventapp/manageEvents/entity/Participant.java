package springbooteventapp.eventapp.manageEvents.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;


@Getter
@Setter
@Entity
@SequenceGenerator(name = "idgen", sequenceName = "PARTICIPANT_SEQ")
public class Participant extends BaseEntiy{


    @Column(name = "NAME")
    private String name;
    @Column(name = "SURNAME")
    private String surname;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "TC_KIMLIK_NO")
    private String tcKimlikNo;



}
