import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface BasicResource {
  name: string;
  path: string;
}

const textureMap = {};
const modelMap = {};
const soundMap = {};

export const loadTextures = async (
  textures: BasicResource[],
): Promise<void> => {
  const loader = new THREE.TextureLoader();

  try {
    for (const { name, path } of textures) {
      textureMap[name] = await loader.loadAsync(
        'build/assets/textures/' + path,
      );
    }
  } catch (e) {
    console.error('ResourceMan::loadTextures', e);
  }
};

export const getTexture = (name: string): THREE.Texture | null => {
  if (!textureMap[name]) {
    console.error('TextureMan::getTexture: texture not found: ' + name);
    return null;
  }
  return textureMap[name];
};

export const loadModels = async (models: BasicResource[]): Promise<void> => {
  const loader = new GLTFLoader();
  try {
    for (const { name, path } of models) {
      modelMap[name] = await loader.loadAsync('build/assets/models/' + path);
    }
  } catch (e) {
    /* handle error */
    console.error('ResourceMan::loadModels', e);
  }
};

export const getModel = (name: string): GLTF | null => {
  if (!modelMap[name]) {
    console.error('ModelMan::getModel: model not found: ' + name);
    return null;
  }
  return modelMap[name];
};

export const loadSounds = async (sounds: BasicResource[]): Promise<void> => {
  try {
    const loader = new THREE.AudioLoader();
    for (const { name, path } of sounds) {
      soundMap[name] = await loader.loadAsync('build/assets/sounds/' + path);
    }
  } catch (e) {
    /* handle error */
    console.error('ResourceMan::loadSounds', e);
  }
};

export const getSound = (name: string): AudioBuffer | null => {
  if (!soundMap[name]) {
    console.error('SoundMan::getSound: sound not found: ' + name);
    return null;
  }
  return soundMap[name];
};
