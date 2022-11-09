
export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tempora doloremque omnis corrupti. Dolorum, distinctio.',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: ' Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Aliquet enim tortor at auctor urna nunc id. Adipiscing elit duis tristique sollicitudin nibh sit. Diam phasellus vestibulum lorem sed. Pellentesque diam volutpat commodo sed.',
            picture: null
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'Risus feugiat in ante metus dictum. Est ullamcorper eget nulla facilisi etiam dignissim. Euismod lacinia at quis risus sed vulputate odio. Eu consequat ac felis donec et. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Et malesuada fames ac turpis egestas integer eget aliquet.',
            picture: null
        }
    ]
})