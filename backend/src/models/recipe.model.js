// recipe-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const recipe = new Schema(
    {
      name: { type: String, required: [true, 'Recipe Name is required'] },
      ingredients: {
        type: String,
        required: [true, 'Ingredients are required']
      },
      recipeSteps: {
        type: String,
        required: [true, 'Steps are required']
      },
      recipeType: { type: String, required: false },
      valueCalories: { type: String, required: false },
      valueTotalFat: { type: String, required: false },
      valueSatFat: { type: String, required: false },
      valueCholesterol: { type: String, required: false },
      valueSodium: { type: String, required: false },
      valueTotalCarb: { type: String, required: false },
      valueSugars: { type: String, required: false },
      valueProteins: { type: String, required: false },
      isDessert: { type: Boolean, required: false },
      numberOfServings: { type: Number, required: true, default: 1 },
      preparationTime: { type: Number, required: false, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('recipe', recipe);
};
