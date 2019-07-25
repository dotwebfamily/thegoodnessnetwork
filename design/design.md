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
      - Ranking history
      - History of posted requests
  - See other's profiles
    - Which contains:
      - Current reputation 
      - Past fulfilled help requests
      - Ranking history
      - History of posted requests
  - Log in
  - Register 
    - Requires user to give:
      - First name
      - Last name
      - Email
      - Password
      - Country
      - picture
    - or
      - FB
  - Recover password

  // Help requests
  - Post help requests
    - Which have:
      - Given by user:
        - Title
        - What does the favor consists of
        - Amount to be paid
        - Required reputation
        - Tags
        - priority
        - deadline or permanent
      - Given by system:
        - Creation date
        - Old requests 
  - Repost a previous help request
  - See fulfilled requests
  - See on progress requests
  - See request details
  - Search/Filter help requests
    - Which can be filtered by
      - tags
  - Apply to a help request (user applying wants to do it)
  - See help request applicants
  - Accept a candidate
    - Which then are marked as already in progress and cannot be applied further
  - Mark help requests as fulfilled
    - If both fulfill, payment is done
    - If anybody doesn't either one can ask a moderator to intervene
  - Report "bad" help requests
  - physical and emotional, require ranking 1

  // Friends List (stage 2)
  - Add a friend
  - See friends list
  - Filter friends list
  - Remove friend from list

  // chatrooms (stage 2)
  - Search/Filter chatrooms
    - Which can be filtered by
      - tags
  - Join chatrooms
  - Chat in chatrooms
  - Receive messages of subscribed chatrooms
  - Join private chats

  // Moderation and rankings (stage 3)
  - Change ranking on fulfulling requirements
    - the requirements can be:
      - Moderator approval (x members vote)
      - User approval (x members vote)
      - Minimum reputation
      - Minimum different people helped
      - Govt ID
  - Have moderator access if ranking corresponds
