-- Insert Breakfast Constants
INSERT INTO public.meal_constants (item_name, requires_overnight_soak) VALUES
  ('70 g dry chana', true),
  ('30 g bhunja chana', false),
  ('4 almonds', false),
  ('1-2 whole fruits', false)
ON CONFLICT (item_name) DO NOTHING;

-- Insert Lunch Rotation
-- Note: Weekdays in JS/Postgres extract(dow): 0=Sunday, 1=Monday... 6=Saturday
INSERT INTO public.meal_rotation (weekday, ingredient, requires_overnight_soak) VALUES
  (1, '70 g dry rajma + 40 g dry soya', true),
  (2, '70 g dry chole + 100 g paneer', true),
  (3, '70 g dry rajma + 60 g dry dal', true),
  (4, '70 g dry chole + 40 g dry soya', true),
  (5, '70 g dry rajma + 100 g paneer', true),
  (6, '70 g dry chole + 60 g dry dal', true),
  (0, '70 g dry rajma + 40 g dry soya', true)
ON CONFLICT (weekday) DO UPDATE SET 
  ingredient = EXCLUDED.ingredient, 
  requires_overnight_soak = EXCLUDED.requires_overnight_soak;

-- Insert Breakfast Choices
INSERT INTO public.meal_choices (meal_type, option_label, ingredients) VALUES
  ('breakfast', '3-4 bread + 30 g peanut butter', '[]'),
  ('breakfast', '60-70 g dry poha + 30-40 g peanuts', '[]'),
  ('breakfast', '60-70 g dry suji upma + 30-40 g peanuts', '[]'),
  ('breakfast', '2-3 rotis + 150-200 g sabzi', '[]'),
  ('breakfast', '50 g sattu + water + lemon + jeera', '[]');

-- Insert Snack Choices
INSERT INTO public.meal_choices (meal_type, option_label, ingredients) VALUES
  ('snack', '50 g sattu + water + lemon + jeera', '[]'),
  ('snack', '50-60 g dry chana, boiled + 100-150 g vegetables + lemon', '[{"name": "dry chana", "requires_overnight_soak": true}]'),
  ('snack', '200 g curd + 20 g peanuts', '[]'),
  ('snack', '30 g bhunja chana + 200 g curd', '[]'),
  ('snack', '2 bread + 30 g peanut butter', '[]'),
  ('snack', '100 g sprouts + 30 g bhunja chana', '[]');

-- Insert Dinner Choices
INSERT INTO public.meal_choices (meal_type, option_label, ingredients) VALUES
  ('dinner', '100 g paneer + 1-2 rotis + 200-250 g sabzi + salad', '[]'),
  ('dinner', '50-60 g dry soya + 1-2 rotis + 200-250 g sabzi + salad', '[]'),
  ('dinner', '70 g dry rajma/chole + 1-2 rotis + 200-250 g sabzi + salad', '[{"name": "dry rajma/chole", "requires_overnight_soak": true}]'),
  ('dinner', '60-70 g dry dal + 1-2 rotis + 200-250 g sabzi + salad', '[]'),
  ('dinner', '50 g sattu + 100 g sprouts + 1-2 rotis + 200-250 g sabzi + salad', '[]');

-- Insert Night/Extra Choices (Mapped as Snack/Dinner extras for now, or just dinner)
INSERT INTO public.meal_choices (meal_type, option_label, ingredients) VALUES
  ('dinner', 'NIGHT: 350 g buffalo milk', '[]');
