package springbooteventapp.eventapp.manageEvents.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EventDTO {

    private String name;
    private int quota;
    private LocalDate startDate;
    private LocalDate endDate;

}
