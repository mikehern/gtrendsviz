- [x] Set up config file
- [x] Experiment with line charts
- [x] Set max news range to last 30 days
- [x] Connect to newsapi.org - note 30 day rolling limit
- [x] Display date in chart during hover
- [x] Include section for related queries - use GSAP and blur to clear current text upon selection
- [x] When exploring the line chart, display news based on clicked datum - use ReactTransitionGroup
- [x] Add dynamic labels and handle UI empty states
- [ ] Include attributions
- [IP] Style and animate [responsive layout]
- [x] Create top level starting page
- [ ] Add CTAs for each news article [back of news image + 180y transform]

# Nice to have
- [ ] Create date helper to narrow news query to peak dates
- [ ] Allow customizable query search based on location. Experiment w/ ipstack API for default.
- [ ] Use a rotating ortographic projection to highlight geo
- [ ] Allow configurable queries
- [ ] Display recent searches?
- [ ] Conditionally animate news image only after fetch is complete
- [ ] Create exit animations

# Known issues/debt
- [ ] Adjust trending line margins and tooltip layout
- [x] Add cursor pointer to [trending line chart, news headline]
- [ ] Refactor News component so article count value in state is used instead of checking length
- [ ] Factor out search
- [ ] Remove entrance animation for news label
- [ ] Change related search placeholder to grayscale
- [ ] Create backing svg rect for search placeholder text to wrap into