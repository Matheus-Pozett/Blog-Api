const mockNewPost = {
  id: 8,
  title: "Post Sucesso",
  content: "Conteudo Top",
  userId: 10,
  updated: "2025-12-28T22:19:04.651Z",
  published: "2025-12-28T22:19:04.651Z",
  dataValues: { 
    id: 8,
    title: "Post Sucesso",
    content: "Conteudo Top",
    userId: 10,
    updated: "2025-12-28T22:19:04.651Z",
    published: "2025-12-28T22:19:04.651Z"
  } 
};

const mockAllPosts = [
	{
		id: 3,
		title: "GALERA",
		content: "TESTE",
		userId: 2,
		published: "2025-12-26T12:56:43.000Z",
		updated: "2025-12-27T11:02:31.000Z",
		user: {
			id: 2,
			displayName: "Michael Schumacher",
			email: "MichaelSchumacher@gmail.com",
			image: "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
		},
		categories: [
			{
				id: 1,
				name: "Inovação"
			},
			{
				id: 2,
				name: "Escola"
			}
		]
	},
	{
		id: 4,
		title: "Latest updates, August 1st",
		content: "The whole text for the blog post goes here in this key",
		userId: 2,
		published: "2025-12-26T13:31:53.000Z",
		updated: "2025-12-26T13:31:53.000Z",
	  user: {
			id: 2,
			displayName: "Michael Schumacher",
			email: "MichaelSchumacher@gmail.com",
			image: "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
		},
		categories: [
			{
				id: 1,
				name: "Inovação"
			},
			{
				id: 2,
				name: "Escola"
			}
		]
	}
];

const mockPostId = {
	id: 3,
	title: "test",
	content: "UM TESTE",
	userId: 2,
	published: "2025-12-26T12:56:43.000Z",
	updated: "2025-12-27T11:02:31.000Z",
	user: {
		id: 2,
		displayName: "Michael Schumacher",
		email: "MichaelSchumacher@gmail.com",
		image: "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
	},
	categories: [
		{
			id: 1,
			name: "Inovação"
		},
		{
			id: 2,
			name: "Escola"
		}
	]
}

const mockUpdatedPost = {
	id: 3,
	title: "Latest updates, August 1st",
	content: "The whole text for the blog post goes here in this key",
	userId: 2,
	published: "2025-12-26T12:56:43.000Z",
	updated: "2025-12-27T11:02:31.000Z",
	user: {
		id: 2,
		displayName: "Michael Schumacher",
		email: "MichaelSchumacher@gmail.com",
		image: "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
	},
	categories: [
		{
			id: 1,
			name: "Inovação"
		},
		{
			id: 2,
			name: "Escola"
		}
	]
}

module.exports = {mockNewPost, mockAllPosts, mockPostId, mockUpdatedPost}