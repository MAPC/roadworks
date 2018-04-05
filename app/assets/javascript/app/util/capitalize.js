const blacklist = [ 'and', 'of' ];

export default function capitalize(text) {
  if (text === null) { return null; }

  return text.split(/-| /)
             .map(word => word.toLowerCase())
             .map(word => {
               if (blacklist.indexOf(word) !== -1) {
                 return word;
               }
               else {
                return word.charAt(0).toUpperCase() + word.slice(1)
               }
             })
             .join(' ');
}
