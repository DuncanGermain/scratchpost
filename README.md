http://scratchpost.herokuapp.com/index.html
http://scratchpost.herokuapp.com/html/part.html

The end goal of this project is a web application that collects input from up to thirty users and displays it in a single window.

Example: a middle school teacher using a smartboard/projector has put up a grammatically incorrect sentence.  Each student submits their correction; all of the corrected sentences appear in a grid on the screen, where they can be zoomed, rearranged, and dynamically edited or compared.

Example: a CodeFellows lecturer wants to check comprehension on the topic just covered.  Each student types #, ##, ###, ####, or ##### to indicate their level of comfort with the topic; the board becomes an immediate visceral representation of how comfortable the class is, as a whole.

Example: a manager is leading a meeting and does not want her presentation interrupted, but acknowledges that there may be questions, and allows for them to be posted as her presentation continues, to be addressed individually at the end.

Core functionality (complete or near-finished):
 - Dynamic "prompt" field controlled by the leader, such that questions can be pushed to appear on participants' screens.
 - Dynamic removal of the input fields on user's pages (if resubmit is not desired) once a question has been answered.
 - Auto-removal of an answer window if its user disconnects; smooth integration of late entries/re-entries.
 - Storage of post-history on each participant's page so that they may copy-paste if resubmitting identical or similar responses.
 - Dynamic HTML/CSS such that the responses are presented optimally based on how many of them there are (e.g. 3 responses laid out differently than 13 or 23).  This will include both how the fields are laid out and how content within those fields is displayed.
 - Optional reshuffling of answer windows upon each new question, to increase anonymity.
 - Optional removal of automatic bylining, to increase anonymity.
 - Optional hiding of answer fields, so as to reveal all answers at once rather than live updating (default).
 - Dynamic deletion of response fields, such that responses may be narrowed down.
 - Dynamic rearranging of response fields, such that similar ones may be placed next to one another for comparison.
 - Click-to-edit on the leader's end, so that responses may be played around with.



Future/possible features:
 - Some kind of login/passcode such that all members can "join" a unique session (since the application will be public).
 - Toggle between "button" view (in which responses are put into screen-proportioned rectangles) and "line" view (in which each response is its own line taking the full width of the window).
