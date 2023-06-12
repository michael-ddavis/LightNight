Light Night Volunteer Staff /  Volunteer Guest Site User Story and Privileges

1. There will two types of users for this portion of the site, "Volunteer Staff" and  "Volunteer Guest".
2. Volunteer staff priveleges:
  2a. [ ] automatically be added to all events unless they decline a particular event
  2b. [ ] able to view all event information
  2c. [ ] allowed to be team leads?
  2e. Team Lead priveleges: 
    2ea. [ ] only able to make edits their assigned team
    2eb. [ ] only able to view all pertinent information that their team needs
    2ec. [ ] only allowed to add people to their team if the person is available
  2f. [ ] allowed to add people to any team, if the person is available
3. Volunteer Guest priveleges:
    3a. [ ] must be added to a team by a team lead
    3b. [ ] only able to see pertinent team information 
    3c. [ ] can request to be a volunteer staff member

4. Teams
    - [ ] Greeters
    - [ ] Setup / Tear Down
    - [ ] Intercession / Prayer Team
    - [ ] Music
    - [ ] Live Stream A/V
    - [ ] In house A/V
    - [ ] Photography / Videopgraphy 
    - [ ] Social Media?

5. Feature Access
    - Every team can view:
        - [ ] Event Date, Time and Location
        - [ ] Event Itinerary
        - [ ] members of that team
        - [ ] messages directed to "all teams"
        - [ ] messages directed to that team or from that team lead
    -  Music, Live Stream A/V, In house A/V can view:
        - [ ] Lyrics for each song 
        - [ ] Rehearsal Dates and Times 
    - Live Stream A/V, In house A/V
        - [ ] Equipment List
        - [ ] Musicians Equipment List 
    - Music 
        - [ ] PDF Chord Charts and Sheets
        - [ ] Links to music 


Event: {
    title: "",
    date: DateTime,
    address: "",
    teams: [Greeters, Music, etc..],
    itinerary: PDF Document,
}

Team {
    title: "",
    teamLead: TeamMember,
    teamDescription: "",
    teamMembers: [TeamMember],
    messages: [Message],

}

MusicTeam {
    Rehearsal times: [RehearsalTime],
    setList: [Song]
}

LiveStreamAVTeam {

}

TeamMember  {
    name: "",
    role: Boolean (Volunteer Staff or not),
    teams: [], (Unless the team is Music, Live A/V, LiveStream A/V, a team member can be put on more than one team if they would like to do so)
    phoneNumber: "",
    picture: Image,
}

Message {
    message: "",
    time: DateTime,
    sentBy: TeamMember
}
