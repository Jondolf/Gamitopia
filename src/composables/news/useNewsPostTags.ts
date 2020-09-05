interface Tag {
  backgroundColor: string;
  textColor: string;
}

export function useNewsPostTags() {
  const tags = {
    anniversary: { backgroundColor: 'rgb(225, 0, 175)', textColor: 'white' },
    gamerelease: { backgroundColor: 'rgb(75, 150, 255)', textColor: 'white' },
    gameupdate: { backgroundColor: 'rgb(75, 200, 100)', textColor: 'white' },
    ui: { backgroundColor: 'rgb(60, 225, 100)', textColor: 'white' },
    feature: { backgroundColor: 'rgb(200, 0, 200)', textColor: 'white' },
    fix: { backgroundColor: 'rgb(175, 175, 0)', textColor: 'white' },
    backend: { backgroundColor: 'rgb(200, 50, 50)', textColor: 'white' },
    code: { backgroundColor: 'rgb(125, 125, 150)', textColor: 'white' }
  }

  function getTagByName(tagName: string): Tag {
    // @ts-ignore
    const tag: Tag = tags[tagName.toLowerCase()] ?? { backgroundColor: 'rgb(175, 175, 175)', textColor: 'white' };
    return tag;
  }

  return { getTagByName }
}