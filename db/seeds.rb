# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dir = "/Users/appacademy/stock/"

12.times do |i|
  Piece.create({
    title:  "#{Faker::Name.last_name} #{Faker::Lorem.words(1)[0]}",
    image: File.open( dir+ 'image'+ i.to_s + '.jpg'),
    caption: Random.rand(3) == 0 ? '' : "#{Faker::Lorem.paragraph}",
    date_finished: Date.today - Random.rand(400)
  })
end