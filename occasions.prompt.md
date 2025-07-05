Reference the STRATEGY.md file in this project for all development decisions and priorities.
Today's task: Consolidate restaurant occasions and create occasion mapping system
Key requirements from strategy:

Superior organization and user experience
Complete practical information for each restaurant
Maintain granular data while improving UX

Occasion Consolidation:
Create 6 main occasion categories:

Special Occasions & Celebrations
Family Dining
Breakfast & Brunch
Casual Dining & Lunch
Ski & Mountain Experience
Drinks & Social

Technical Implementation:

Create new data file: _data/occasionMapping.json with structure:

json{
  "Special Occasions & Celebrations": [
    "celebration",
    "date-night", 
    "special-occasion",
    "fine-dining-experience",
    "business-dining",
    "unique-experience",
    "authentic-french",
    "book-browsing",
    "contemporary-dining"
  ],
  "Family Dining": [
    "family-dining",
    "family-gathering",
    "family-breakfast", 
    "family-steakhouse",
    "large-groups"
  ]
  // etc for all 6 categories
}

Update occasion filtering/dropdown to use the 6 main categories while preserving original granular occasion data in restaurant JSON
Maintain existing data structure - don't change individual restaurant occasion fields, just add the mapping layer

This allows future granular occasion additions while presenting clean 6-category UX to users.
Build this following the technical requirements and content standards outlined in STRATEGY.md.