# EasyAdminFieldsBundle

## Installation

Run the following command to install EasyAdminFields in your application:

```shell
$ composer require insitaction/easyadmin-fields-bundle
```

Use the bundle assets

```php
// DashboardController.php

use Insitaction\EasyAdminFieldsBundle\EasyAdminFieldsBundle;

public function configureAssets(): Assets
{
    $assets = parent::configureAssets();
    
    return EasyAdminFieldsBundle::configureAssets($assets);
}
```

Without the helper method

```php
// DashboardController.php

use Insitaction\EasyAdminFieldsBundle\Asset\AssetPackage;

public function configureAssets(): Assets
{
    $jsAsset = Asset::new('app.js')->package(AssetPackage::PACKAGE_NAME);
    $cssAsset = Asset::new('app.css')->package(AssetPackage::PACKAGE_NAME);

    return parent::configureAssets()
        ->addJsFile($jsAsset)
        ->addCssFile($cssAsset);
}
```

## Fields

### Mask field

The mask field allows you to show or hide other fields depending on one field's value

#### Usage

- With the MaskField wrapper

```php
MaskField::adapt(
    BooleanField::new('hasAuthor'),
    [
        "true" => ['author']
    ]
)
```

- Directly adding form type options to your field

```php
BooleanField::new('hasAuthor')
    ->setFormTypeOptions([ 
        'row_attr' => [
            'data-controller' => 'mask-field',
            'data-mask-field-map' => MaskField::encodeMap([
                "true" => ['author']
            ])
        ],
    ])
```

#### Configuration

The map configuration works like this:

- The key corresponds to an input value
- The value is an array of field names

With this map configuration :

```php
[
    "true" => ['author']
]
```

The `author` field is shown only when `true` is the input value, otherwise, the `author` field is masked

With this map configuration :

```php
[
    "A" => ['field1'],
    "B" => ['field1', 'field2'],
    "C" => ['field2'],
]
```

The `field1` field is shown when either `A` or `B` is the input value, the `field2` field is shown when either `B`
or `C` is the input value

### Dependent field

The dependent field can wrap ChoiceField or AssociationField to make their available options dynamic If any of the field
dependencies is updated, a request is emitted to retrieve new options for the dependent field

#### Usage

- With the DependentField wrapper

```php
 DependentField::adapt(
    AssociationField::new('author'),
    [
        'callback_url' => $this->urlGenerator->generate('authors', [], UrlGeneratorInterface::ABSOLUTE_URL),
        'dependencies' => ['gender'],
        'fetch_on_init' => true
    ]
)
```

#### Configuration

##### Dependencies

The `dependencies` array is an array of string corresponding to other fields name

With this dependencies configuration, the callback will be called everytime the `gender` field is updated

```php
'dependencies' => ['gender']
```

##### Callback Url

The `callback_url` must be an url that accepts a GET request which returns data of this format:

```json
[
  {
    "text": "John Doe",
    "value": 1
  },
  {
    "text": "John Snow",
    "value": 2
  }
]
```

The following query parameters will be sent with the request (this corresponds to the dependencies array and the
corresponding field value)

```json
{
  "gender": "Male"
}
```

##### Fetch on init

The `fetch_on_init` parameter defines wheter or not the callback should be executed immediatly after the field is
mounted
