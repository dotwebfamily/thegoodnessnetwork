# Design

## Objective
To become a good people support community

## Glossary of terms
Reputation - unspent goodness coins
Goodness coins - the coins used to pay for help and which amount to reputation

## Technical requirements
- Users must be able to:

  // User system
  - See their profile
    - Which contains:
      - Current reputation 
      - Past fulfilled help requests
  - See other's profiles
  - log in
  - register 

  // Help requests
  - Post help requests
    - Which have:
      - Amount to be paid
      - What does the favor consists of
      - Required reputation
      - Tags
  - Search/Filter help requests
    - Which can be filtered by
      - tags
  - Accept help requests (user accepting will be doing it)
    - Which then are marked as already in progress and do cannot be accepted by anyone else
  - Mark help requests as fulfilled
    - If both fulfill, payment is done
    - If anybody doesn't either one can ask a moderator to intervene

  // chatrooms
  - Search/Filter chatrooms
    - Which can be filtered by
      - tags
  - Join chatrooms
  - Chat in chatrooms
  - Receive messages of subscribed chatrooms
  - Join private chats

  // Moderation and rankings
  - Change ranking on fulfulling requirements
    - the requirements can be:
      - user approval (x members vote)
    -
  - Have moderator access

