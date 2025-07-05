Reference the STRATEGY.md file in this project for all development decisions and priorities.
Today's task: Consolidate restaurant categories and create category mapping system
Key requirements from strategy:

Superior organization and user experience
Complete practical information for each restaurant
Maintain granular data while improving UX

Category Consolidation:
Create 7 main restaurant categories:

Fine Dining & Steakhouses
Contemporary American
Casual American & Sports Bars
Breakfast & Brunch Spots
Seafood
International Fusion
Quick Bites & Cafes

Technical Implementation:

Create new data file: _data/categoryMapping.json with structure:

json{
  "Fine Dining & Steakhouses": [
    "Contemporary American (Tasting Menus)",
    "Modern American Steakhouse",
    "Western Steakhouse", 
    "New American (French/Italian influences)",
    "French-European"
  ],
  "Contemporary American": [
    "Contemporary American",
    "New American (Roots Cuisine)",
    "European-American",
    "Brazilian-American Fusion"
  ]
  // etc for all 7 categories
}

Update restaurant filtering/display to use the 7 main categories while preserving original granular cuisine data in restaurant JSON
Maintain existing data structure - don't change individual restaurant cuisine fields, just add the mapping layer

This allows future granular cuisine additions while presenting clean 7-category UX to users.
Build this following the technical requirements and content standards outlined in STRATEGY.md.