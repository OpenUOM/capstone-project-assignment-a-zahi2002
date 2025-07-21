exports.seed = function(knex) {
  return knex('dummyData').del()
    .then(function () {
      return knex('dummyData').insert([
        { id: 1, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
        { id: 2, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
        { id: 3, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
        { id: 4, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
        { id: 5, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
        { id: 6, dummyDataOne: 'DummyData', dummyDataTwo: 'DummyData'},
      ]);
    });
};