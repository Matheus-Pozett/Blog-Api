const userMock = {
  id: 2,
  displayName: 'Michael Schumacher',
  email: 'MichaelSchumacher@gmail.com',
  password: '123456',
  image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
}

const userSequelizeMock = {
  ...userMock,
  dataValues: {
    ...userMock
  }
};

const allUsersMock = [
	{
		"id": 2,
		"displayName": "Michael Schumacher",
		"email": "MichaelSchumacher@gmail.com",
		"image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
	},
	{
		"id": 3,
		"displayName": "Brett Wiltshire",
		"email": "brett@email.com",
		"image": null
	}
];

const userIdMock = {
  id: 2,
  displayName: 'Michael Schumacher',
  email: 'MichaelSchumacher@gmail.com',
  image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJNaWNoYWVsIFNjaHVtYWNoZXIiLCJlbWFpbCI6Ik1pY2hhZWxTY2h1bWFjaGVyQGdtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9zcG9ydGJ1enoudW9sLmNvbS5ici9tZWRpYS9fdmVyc2lvbnMvZ2V0dHlpbWFnZXMtNTI0OTE1NjVfd2lkZWxnLmpwZyIsImlhdCI6MTc2NjkyODQyNiwiZXhwIjoxNzY3MDE0ODI2fQ.2ZXEd84IjqqViNcPXOJsgI8JlXmXER2KmDpVb_iplE4"

module.exports = {userMock, userSequelizeMock, token, allUsersMock, userIdMock}